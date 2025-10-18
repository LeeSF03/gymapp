import React, { useMemo } from 'react';

// Load Tailwind CSS script for utility classes
const TailwindScript = () => (
    <script src="https://cdn.tailwindcss.com"></script>
);

// --- TYPE DEFINITIONS ---
// Interface representing the structure of a Gym Member User.
interface GymUser {
    fullName: string;
    email: string;
    expiresAt: string;
    contactNumber: string;
    memberId: string;
}

// Interface representing the entire User Store state.
interface UserStoreState {
    user: GymUser;
}

// --- MOCK ENVIRONMENT FOR RUNNABLE CODE ---
const MOCK_USER_DATA: GymUser = {
    fullName: "Zafran Bin Muhamad Sakowi",
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
const useUserStore = (selector: (state: UserStoreState) => any): GymUser => {
    const mockState: UserStoreState = {
        user: MOCK_USER_DATA
    };
    // Ensure the selector always returns the expected type, GymUser in this case.
    return selector(mockState) as GymUser;
};


// Helper component for detail rows
interface DetailItemProps {
    label: string;
    value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => (
    <div className="flex justify-between items-center text-base">
        <span className="text-gray-400">{label}</span>
        <span className="text-white font-medium">{value}</span>
    </div>
);

// Main Profile Component
const App = () => {
    // Correctly using the selector pattern to access 'user' from the store state
    const user: GymUser = useUserStore((state: UserStoreState) => state.user);

    // Use useMemo for computed values to keep rendering efficient
    const { membershipStatus, statusColor, planName, endDate } = useMemo(() => {
        const expirationDate = new Date(user.expiresAt);
        const currentDate = new Date();

        const isActive = expirationDate > currentDate;

        return {
            membershipStatus: isActive ? "ACTIVE" : "EXPIRED",
            // Subtle colors for status text
            statusColor: isActive ? "text-green-400 bg-green-900/50" : "text-red-400 bg-red-900/50",
            planName: "1-Month All Access", // Placeholder
            endDate: expirationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        };
    }, [user.expiresAt]);

    const handleRenewClick = () => {
        console.log("Navigating to Payment Page...");
        // NOTE: Using a custom message box UI is preferred over alert() in production.
        alert("Navigating to Payment Page to renew membership.");
    };

    return (
        // Deep black background matching the 'XFitness' homepage theme
        <div className="min-h-screen bg-black p-4 sm:p-8 font-['Inter'] pt-8">
            <TailwindScript />

            {/* Main content area */}
            <div className="max-w-xl mx-auto">

                {/* Header and Avatar */}
                <div className="flex flex-col items-center border-b border-gray-800 pb-6 mb-6">
                    {/* Avatar: Dark circle with a bright yellow border */}
                    <div className="relative w-24 h-24 rounded-full bg-gray-900 border-2 border-yellow-400 flex items-center justify-center text-yellow-400 text-4xl font-bold mb-4 shadow-xl">
                        {user.fullName[0]}
                    </div>
                    <h1 className="text-3xl font-extrabold text-white">{user.fullName}</h1>
                    <p className="text-sm text-gray-400 mt-1">Member ID: {user.memberId}</p>
                </div>

                {/* Membership Status Card (Floating Dark Card Style) */}
                <div className="mb-6 p-4 rounded-xl bg-gray-900 shadow-lg">
                    {/* Yellow title accent to match the homepage's bold yellow */}
                    <h2 className="text-xl font-bold text-yellow-400 mb-3 uppercase tracking-wider">Your Membership</h2>

                    <div className="flex items-center justify-between py-2 border-b border-gray-800">
                        <p className="text-gray-300 font-medium">Status</p>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${statusColor}`}>
                            {membershipStatus}
                        </span>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                        <p className="text-gray-300 font-medium">Plan</p>
                        <p className="text-white font-semibold">{planName}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-gray-300 font-medium">Valid Until</p>
                        <p className="text-white font-semibold">{endDate}</p>
                    </div>
                </div>

                {/* Member Details Section (Floating Dark Card Style) */}
                <div className="mb-8 p-4 rounded-xl bg-gray-900 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Account Information</h2>

                    <div className="space-y-3">
                        <DetailItem label="Email" value={user.email} />
                        <DetailItem label="Phone" value={user.contactNumber} />
                    </div>
                </div>

                {/* Action Button - Bright Yellow CTA to match homepage */}
                <button
                    onClick={handleRenewClick}
                    // Updated to bg-yellow-400 for consistency and increased padding for prominence
                    className="w-full py-4 mt-4 bg-yellow-400 text-black font-extrabold text-lg rounded-xl shadow-lg shadow-yellow-500/30 hover:bg-yellow-500 transition duration-300 transform hover:scale-[1.01] active:scale-95"
                >
                    Renew / Upgrade Plan
                </button>

                {/* Additional Links - Subtle yellow links */}
                <div className="mt-6 space-y-2 text-center pt-4 border-t border-gray-900">
                    <button
                        onClick={() => alert("Navigating to Access Logs...")}
                        className="w-full text-yellow-400 hover:text-yellow-300 text-sm py-2 px-4 rounded-lg transition"
                    >
                        View Check-in History
                    </button>
                    <button
                        onClick={() => alert("Navigating to Notifications...")}
                        className="w-full text-yellow-400 hover:text-yellow-300 text-sm py-2 px-4 rounded-lg transition"
                    >
                        View Announcements
                    </button>
                </div>

            </div>
        </div>
    );
};

// Export the component as App to be rendered by the environment
export default App;
