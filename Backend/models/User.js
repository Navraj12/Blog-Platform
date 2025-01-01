import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Create unique indexes for username and email
UserSchema.index({ username: 1, email: 1 }, { unique: true });

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next(); // Skip if password is not modified
    const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next(); // Proceed with saving
});

// Create and export the User model
const User = mongoose.model('User', UserSchema);
export default User;