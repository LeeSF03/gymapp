import React, { useMemo } from 'react';
// Note: In a real mobile app, 'useUserStore' would be imported from your state management.
// We use a mock here to make the single file runnable.

// --- TYPE DEFINITIONS ---
/**
 * Interface representing the structure of a Gym Member User.
 * This resolves the implicit 'any' warnings.
 */
interface GymUser {
    fullName: string;
    email: string;
    expiresAt: string;
    contactNumber: string;
    memberId: string;
}

/**
 * Interface representing the entire User Store state.
 */
interface UserStoreState {
    user: GymUser;
}

// --- MOCK ENVIRONMENT FOR RUNNABLE CODE ---

const MOCK_USER_DATA: GymUser = {
    fullName: "Zafran Bin Muhamad", // Updated name for the KG theme feel
    email: "zafran@clientgym.com",
    // Set expiration date slightly in the future (30 days from now)
    expiresAt: new Date(Date.now() + 86400000 * 30).toISOString(),
    contactNumber: "012-345 6789",
    memberId: "MEM-4739",
};

/**
 * Mocking the useUserStore hook for demonstration.
 * @param {function(state: UserStoreState): any} selector - Function to select a part of the mock state.
 */
const useUserStore = (selector: (state: UserStoreState) => any) => {
    const mockState: UserStoreState = {
        user: MOCK_USER_DATA
    };
    return selector(mockState);
};


// Main Profile Component
const ProfileScreen = () => {
    // Correctly using the selector pattern to access 'user' from the store state
    const user: GymUser = useUserStore((state: UserStoreState) => state.user);

    // Use useMemo for computed values to keep rendering efficient
    const { membershipStatus, statusColor, planName, endDate } = useMemo(() => {
        const expirationDate = new Date(user.expiresAt);
        const currentDate = new Date();

        const isActive = expirationDate > currentDate;

        return {
            membershipStatus: isActive ? "ACTIVE" : "EXPIRED",
            // Use subtle colors on dark background
            statusColor: isActive ? "text-green-400 bg-green-900/50" : "text-red-400 bg-red-900/50",
            planName: "1-Month All Access", // Placeholder
            endDate: expirationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
    }, [user.expiresAt]);

    const handleRenewClick = () => {
        console.log("Navigating to Payment Page...");
        // Use a custom modal or message box instead of alert() in a real app
        alert("Navigating to Payment Page to renew membership.");
    };

    return (
        // Deep black background matching the 'KG' theme
        <div className="min-h-screen bg-gray-950 p-4 sm:p-8 font-inter">
            {/* Container with slightly lighter background and gold border accent */}
            <div className="max-w-xl mx-auto bg-gray-900 shadow-2xl rounded-xl p-6 sm:p-8 border-t-4 border-amber-400">

                {/* Header and Avatar */}
                <div className="flex flex-col items-center border-b border-gray-700 pb-6 mb-6">
                    {/* Avatar with gold accent background */}
                    <div className="relative w-24 h-24 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 text-4xl font-bold mb-4 shadow-xl">
                        {user.fullName[0]}
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">{user.fullName}</h1>
                    <p className="text-sm text-gray-400 mt-1">Member ID: {user.memberId}</p>
                </div>

                {/* Membership Status Card (Key Information) */}
                <div className="mb-8 p-4 rounded-xl border-2 border-amber-400/30 bg-gray-800/70">
                    {/* Gold title accent */}
                    <h2 className="text-xl font-bold text-amber-400 mb-3 uppercase tracking-wider">Your Membership</h2>

                    <div className="flex items-center justify-between py-2">
                        <p className="text-gray-300 font-medium">Status</p>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusColor}`}>
                            {membershipStatus}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-700/50">
                        <p className="text-gray-300 font-medium">Plan</p>
                        <p className="text-white font-semibold">{planName}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-300 font-medium">Valid Until</p>
                        <p className="text-white font-semibold">{endDate}</p>
                    </div>
                </div>

                {/* Member Details Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Account Information</h2>

                    <div className="space-y-3">
                        <DetailItem label="Email" value={user.email} />
                        <DetailItem label="Phone" value={user.contactNumber} />
                    </div>
                </div>

                {/* Action Button - Gold theme for maximum impact */}
                <button
                    onClick={handleRenewClick}
                    className="w-full py-3 mt-4 bg-amber-400 text-gray-950 font-extrabold text-lg rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-500 transition duration-300 transform hover:scale-[1.01] active:scale-95"
                >
                    Renew / Upgrade Plan
                </button>

                {/* Additional Links (Mocking Navigation) - subtle gold links */}
                <div className="mt-6 space-y-2 text-center pt-4 border-t border-gray-800">
                    <button
                        onClick={() => alert("Navigating to Access Logs...")}
                        className="w-full text-amber-400 hover:text-amber-300 text-sm py-2 px-4 rounded-lg transition"
                    >
                        View Check-in History
                    </button>
                    <button
                        onClick={() => alert("Navigating to Notifications...")}
                        className="w-full text-amber-400 hover:text-amber-300 text-sm py-2 px-4 rounded-lg transition"
                    >
                        View Announcements
                    </button>
                </div>

            </div>
            <script src="https://cdn.tailwindcss.com"></script>
        </div>
    );
};

// Interface for DetailItem props
interface DetailItemProps {
    label: string;
    value: string;
}

// Helper component for detail rows
const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className="flex justify-between items-center text-base">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}</span>
    </div>
);

// Export the component
export default ProfileScreen;
