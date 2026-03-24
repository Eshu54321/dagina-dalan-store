import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // 1. Calculate Summary Stats
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalCustomers = await User.countDocuments({ role: 'user' });

    // Calculate Total Sales (sum of totalPrice from all PAID orders)
    const salesAggregation = await Order.aggregate([
      { $match: { isPaid: true } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } }
    ]);
    const totalSales = salesAggregation.length > 0 ? salesAggregation[0].total : 0;

    // 2. Fetch Recent Orders (Top 5)
    const recentOrders = await Order.find()
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    // 3. Format Revenue Data for Chart (Last 7 Days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const chartDataAggregation = await Order.aggregate([
      { 
        $match: { 
          isPaid: true, 
          createdAt: { $gte: sevenDaysAgo } 
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          revenue: { $sum: "$totalPrice" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Fill missing days with 0 revenue
    const chartData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const found = chartDataAggregation.find(d => d._id === dateStr);
      chartData.push({
        name: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: found ? found.revenue : 0
      });
    }

    return NextResponse.json({
      summary: {
        totalSales,
        totalOrders,
        totalProducts,
        totalCustomers
      },
      recentOrders,
      chartData
    });

  } catch (error: any) {
    console.error('Admin Stats Error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
