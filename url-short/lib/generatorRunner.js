/**
 * Function taken from Kyle Simpson's YDKJS series
 * https://github.com/getify/You-Dont-Know-JS/blob/master/async
 * %20%26%20performance/ch4.md
 * 
 * Takes a promise-aware generator, initializes it and exhausts
 *  recieved iterator. If any of the promises is rejected, it throws
 * an error and sends it back to the generator=
 */

function run(gen, ...args) {
	const it = gen(...args);

	return Promise.resolve()
		.then( function handleNext(value){
			var next = it.next( value );

			return (function handleResult(next){

				if (next.done) {
					return next.value;
				}
				else {
					return Promise.resolve( next.value )
						.then(
							handleNext,
							function handleErr(err) {
								return Promise.resolve(
									it.throw( err )
								)
								.then( handleResult );
							}
						);
				}
			})(next);
		} );
}

module.exports = run;