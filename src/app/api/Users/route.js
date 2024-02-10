
import { User } from "../models/User";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    mongoose.connect(process.env.MONGODB_URI);

  try {
    const body = await req.json();
    const userData = body.formData;

    //Confirm data exists

    if (!userData?.email || !userData.password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // check for duplicate email

    const duplicate = await User.findOne({ email: userData.email })
      .lean()
      .exec();

    if (duplicate) {
      return NextResponse.json({ message: "Duplicate Email" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    userData.password= hashedPassword;

    await User.create(userData)

    return NextResponse.json({ message: "User Created" }, { status: 201 });

  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  }
}
