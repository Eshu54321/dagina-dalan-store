import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Order from '@/models/Order';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    
    // Fetch users with the 'user' role
    const users = await User.find({ role: 'user' }).sort({ createdAt: -1 }).lean();

    // Enrich with order data (total spent)
    const usersWithStats = await Promise.all(users.map(async (user: any) => {
      const orders = await Order.find({ user: user._id, isPaid: true });
      const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
      return {
        ...user,
        totalOrders: orders.length,
        totalSpent
      };
    }));

    return NextResponse.json(usersWithStats);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
