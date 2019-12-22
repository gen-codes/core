import safeEval from "safe-eval";
export function checkCondition(condition, context) {
	try {
		return safeEval(condition.replace(/\\'/g, "'"), context);
	}
	catch(err) {
		return false;
	}
}
