const respondJSON = (request, response, status, object) => {
	response.writeHead(status, {'Content-Type': 'application/json'});
	response.write(JSON.stringify(object));
	response.end();
};

const success = (request, response) => {
	const respondJSON = {
		message: 'This is a successful response.',
	};
	
	respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
	const responseJSON = {
		message: 'This request has the required parameters.',
	};
	
	if(!params.valid||params.valid !== 'true'){
		responseJSON.message = 'Missing valid query parameter set to true.';
		responseJSON.id = 'badRequest';
		return respondJSON(request, response, 400, responseJSON);
	};
	
	if(params.valid == 'true'){
		responseJSON.message = 'Should not be true.';
		responseJSON.id = 'badRequest';
		return respondJSON(request, response, 200, responseJSON);
	}
	
	return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
	const responseJSON = {
		message: 'User does not have authorization.',
	};
	
	if(!params.valid||params.valid !== 'yes'){
		responseJSON.message = "Missing valid query parameter set to yes.";
		responseJSON.id = 'unauthorized';
		return respondJSON(request, response, 401, responseJSON);
	}
	else if (params.valid == 'yes'){
		responseJSON.message = 'Should not be yes.',
		response.id = 'unauthorized';
		return respondJSON(request, response, 200, responseJSON);
	}
};

const forbidden = (request, response, params) => {
	const responseJSON = {
		message: 'User is forbidden from seeing this page.',
	};
	return respondJSON(request, response, 403, responseJSON);
};

const notImplemented = (request, response, params) => {
	const responseJSON = {
		message: 'Feature has not been implemented.',
	};
	return respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
	const responseJSON = {
		message: 'The page you are looking for was not found.',
		id: 'notFound',
	};
	
	return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
	success,
	badRequest,
	unauthorized,
	forbidden,
	notImplemented,
	notFound,
};