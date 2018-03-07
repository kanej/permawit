'use strict'

async function * answers(){
	yield Promise.resolve(42);
};

(async function universe(){
	for await (var answer of answers()){
		console.log(answer)
	}
})()