import { Role } from "../../module/User/user.interface";
import { User } from "../../module/User/user.model";


const adminUser = {
    email: 'admin@ph.com',
    password: "admin123",
    name: 'Admin',
    role: Role.ADMIN,
    clientInfo: {
        device: 'pc',
        browser: 'Unknown',
        ipAddress: '127.0.0.1',
        pcName: 'localhost',
        os: 'Unknown',
        userAgent: 'Seed Script',
    }
};

const seedAdmin = async () => {
    try {
        // Check if an admin already exists
        const isAdminExist = await User.findOne({ role: Role.ADMIN });

        if (!isAdminExist) {
            await User.create(adminUser);

            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    }
};

export default seedAdmin;
