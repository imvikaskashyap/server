import mongoose from "mongoose";

const paymentUserSchema = new mongoose.Schema(
	{
		userId: { type: Number, unique: true },
		name: String,
		email: String,
		phone: Number,
	},
	{
		timestamps: true,
	}
);

paymentUserSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isNew) {
		return next();
	}
	try {
		const lastUser = await mongoose
			.model("paymentUser", paymentUserSchema)
			.findOne({})
			.sort({ userId: -1 })
			.exec();
		user.userId = lastUser ? lastUser.userId + 1 : 1;
		next();
	} catch (error) {
		next(error);
	}
});

export const User = mongoose.model("paymentUser", paymentUserSchema);
