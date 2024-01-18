// Import necessary functions and services
import { validatePassword } from '@/components/validations';
import { UpdatePassword } from '@/service/axios-services/dataFetching';

// Define the PasswordReset function
const PasswordReset = (password: string, phoneNumber: string, confirmPassword: string, success: any, failed: any, push: any, e:any) => {
    // Define the handlePasswordReset function
    const handlePasswordReset = async (e:any) => {
        e.preventDefault();  // Prevent the default form submission behavior

        // Check if the password and confirmPassword are the same
        if (password === confirmPassword) {
            // Validate the password
            if (validatePassword(password)) {
                // Update the password
                const update_password = await UpdatePassword(phoneNumber, password);

                // If the password is updated successfully
                if (update_password.status == 200) {
                    await success({message: 'Your Password has been reset!!'});
                    await push('sign-in');
                    return;
                }
            } else {
                failed({ message: "The password should contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
            }
        } else {
            failed({ message: 'The passwords do not match. Please check.' });
        }
    }

    // Call the handlePasswordReset function
    handlePasswordReset(e);
};

// Export the PasswordReset function
export default PasswordReset;
