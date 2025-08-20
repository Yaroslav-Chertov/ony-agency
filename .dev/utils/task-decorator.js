import chalk from 'chalk';
// INFO: декоратор нужен из-за того, что стандартный не работает.
// А не работает потому что мы вызываем не через cli, а через ЛОАДЕР

const start = (name) => {
    const startDate = new Date().toLocaleString().split(', ')[1];

    console.log(`[${chalk.gray(startDate)}]`, 'Starting', chalk.hex('#325EE0')(name), '...');
}

const finish = (name, d) => {
    const endDate = new Date().toLocaleString().split(', ')[1];
    const diff = Math.floor(performance.now() - d);
    console.log(`[${chalk.gray(endDate)}]`, chalk.hex('#325EE0')(name), diff + 'ms');
    // console.log(`[${chalk.gray(endDate)}]`, 'Finished', chalk.hex('#325EE0')(name), 'finished in', diff + 'ms');
}

const wait = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const taskDecorator = (name, task) => {
    return (done) => {
        const startTime = performance.now();
        // start(name);
        let t;

        t = task(() => {
            finish(name, startTime);
            done();
        });

        // Streams
        if (t?.pipe) {
            t.on('end', (end) => {
                // console.log('end', end);
            });

            t.on('data', (data) => {
                // console.log('data', data);
            });

            t.on('pipe', (pipe) => {
                // console.log('pipe', pipe);
                finish(name, startTime);
                done();
            });

            t.on('close', (close) => {
                // console.log('close', name, close);
                finish(name, startTime);
                done();
            });

            t.on('error', (err) => {
                console.log('err', err.message);
                finish(name, startTime);
                done();
            });

            t.on('finish', async (f) => {
                // console.log('finish', name, f);
                finish(name, startTime);
                done();
            });
        }

        // Promises
        t?.then && t.then(() => {
            finish(name, startTime);
            done();
        }).catch((err) => {
            console.log('catch', err.message);
            finish(name, startTime);
            done();
        })
    }
}

const taskDecoratorPromise = (name, task) => {
    return async (done) => {
        const startTime = performance.now();

        start(name);
        console.log('task ' + name, task);
        const t = await task(done);
        console.log('task', task);

        /* return t?.on('finish', () => {
                finish(name, startTime);
                done();
            }); */

        finish(name, startTime);

        return done;
        /*
        start(name);

        const t = task(() => {
            finish(name, startTime);
            done();
        });

        t?.pipe && t.on('error', (err) => {
            console.log('PIPE', err);
            finish(name, startTime);
            done();
        });

        t?.pipe && t.on('finish', () => {
            finish(name, startTime);
            done();
        });

        t?.then && t.then(() => {
            finish(name, startTime);
            done();
        })

        t?.catch && t.catch((err) => {
            console.log('CATCH', err);
            finish(name, startTime);
            done();
        }) */
    }
}

export default taskDecorator;
export {
    taskDecoratorPromise
};


/* const dots = {
    current: 0,
    interval: 80,
    frames: [
      '⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'
    ]
}

function loadingAnimation(
    text = "test",
    // chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
    chars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    delay = 100
) {
    let x = 0;

    return setInterval(function() {
        process.stdout.write("\r" + chars[x++] + " " + text);
        x = x % chars.length;
    }, delay);
}

const spin = (message) => {
    process.stdout.write(dots.frames[dots.current % 10] + ' ' + message);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(""); // end the line
}
loadingAnimation();

 */
