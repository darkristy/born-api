module.exports = {
  extends: ["darkristy"],
	rules: {
		"import/no-extraneous-dependencies": 0,
		'no-unused-expressions': 0,
	}, 
	settings: {
    "import/resolver": {
			"typescript": {}
    }
	}
};
