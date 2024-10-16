// utils/sessionUtils.js

// Function to check if the session has exceeded the specified duration
function isSessionExpired(session, maxDurationInMinutes = 1) {
	const currentTime = Date.now();
	const sessionStartTime = session.startTime || currentTime;

	const elapsedMinutes = (currentTime - sessionStartTime) / (1000 * 60);

	return elapsedMinutes >= maxDurationInMinutes;
}

// Function to reset the session
function resetSession(ctx) {
	ctx.session.data = {
		preferenceType: null,
		inputType: null,
	};
	ctx.session.startTime = Date.now();
	ctx.session.__scenes = {current: '',state: {}};
	// Additional logic to reset other session data if needed
}

module.exports = {
	isSessionExpired,
	resetSession,
};
