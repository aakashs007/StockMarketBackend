/**
 * Bootstrap your App
 *
 */

const os = require('os');
const cluster = require('cluster');
const App = require('./src/api_v1/providers/app');
const NativeEvent = require('./src/api_v1/exception/native_event');
const env_type = process.argv[2] || 'production';

// if (cluster.isMaster && env_type == 'prod') {
	/**
	 * Catches the process events
	 */
	// NativeEvent.process();

	/**
	 * Clear the console before the app runs
	 */
	// App.clearConsole();

	/**
	 * Load Configuration
	 */
	// App.loadConfiguration();

	/**
	 * Find the number of available CPUS
	 */
	// const CPUS = os.cpus();

	/**
	 * Fork the process, the number of times we have CPUs available
	 */
	// CPUS.forEach(() => cluster.fork());

	/**
	 * Catches the cluster events
	 */
	// NativeEvent.cluster(cluster);

	/**
	 * Loads the Queue Monitor iff enabled
	 */
	//App.loadQueue();

	/**
	 * Run the Worker every minute
	 * Note: we normally start worker after
	 * the entire app is loaded
	 */
	// setTimeout(() => App.loadWorker(), 1000 * 60);

// } else {

	/**
	 * Run the Database pool
	 */
	// App.loadDatabase();

	/**
	 * Run the Server on Clusters
	 */
	// App.loadServer();

	/**\
	 * Initialize services
	 */
	// App.loadServices();

// }


App.loadApp();
