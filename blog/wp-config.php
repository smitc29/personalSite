<?php

/**

 * The base configuration for WordPress

 *

 * The wp-config.php creation script uses this file during the

 * installation. You don't have to use the web site, you can

 * copy this file to "wp-config.php" and fill in the values.

 *

 * This file contains the following configurations:

 *

 * * MySQL settings

 * * Secret keys

 * * Database table prefix

 * * ABSPATH

 *

 * @link https://codex.wordpress.org/Editing_wp-config.php

 *

 * @package WordPress

 */



// ** MySQL settings - You can get this info from your web host ** //

/** The name of the database for WordPress */

define('DB_NAME', 'i4315927_wp1');



/** MySQL database username */

define('DB_USER', 'i4315927_wp1');



/** MySQL database password */

define('DB_PASSWORD', 'D.q]J(uCxOk3dqmY9Q(02^(7');



/** MySQL hostname */

define('DB_HOST', 'localhost');



/** Database Charset to use in creating database tables. */

define('DB_CHARSET', 'utf8');



/** The Database Collate type. Don't change this if in doubt. */

define('DB_COLLATE', '');



/**#@+

 * Authentication Unique Keys and Salts.

 *

 * Change these to different unique phrases!

 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}

 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.

 *

 * @since 2.6.0

 */

define('AUTH_KEY',         'YtNq6GhsyoVYajlCw9VxjGCIz3HIGAz5Yyx0BPP3bwMh5Tuqb3nip7CUtkjzwQmc');

define('SECURE_AUTH_KEY',  '6hPpOMjdfeL98fM3H0FTWCm6GsuJLialOkUOtk49JPxK2fGTXj4TGLpAkMyF7ggE');

define('LOGGED_IN_KEY',    'r7cLzkKQJZwv9011NbpaVdrpzWIBYnjtA2LjJ6juknR9kEhWcQXBEz7giJnbnc91');

define('NONCE_KEY',        '10uQl42ToMsxFEceWfjr07jKJN5OzdLUzM1pyD8qs94BL3Tw6I5dTOziALSrnJZm');

define('AUTH_SALT',        'vfY2Uc2OVQLGRZTOV75An8Es7hgh3mLTcezh4bJAwX7yHcjV7HHDUvlHidgMZlRl');

define('SECURE_AUTH_SALT', 'IsSIH9vANApcxJ24Nu8iQyRStjOFtzqc0vXCmHip0wuAoo2FG23HfUMJOQDFjyZk');

define('LOGGED_IN_SALT',   'YcBfI3S3SE7VCdyZjKWVT0TudfwycqXbNhJ753PhxttkCMLUv47JQdI8fdjYepSm');

define('NONCE_SALT',       '6VHahHWdP3EM5ufqWYCMljTsZ0kFXry7EDLPAMiCGy8jhAzpCjDAny7rhezjRrVA');



/**

 * Other customizations.

 */

define('FS_METHOD','direct');define('FS_CHMOD_DIR',0755);define('FS_CHMOD_FILE',0644);
define('WP_TEMP_DIR',dirname(__FILE__).'/wp-content/uploads');



/**

 * Turn off automatic updates since these are managed upstream.

 */

define('AUTOMATIC_UPDATER_DISABLED', true);





/**#@-*/



/**

 * WordPress Database Table prefix.

 *

 * You can have multiple installations in one database if you give each

 * a unique prefix. Only numbers, letters, and underscores please!

 */

$table_prefix  = 'wp_';



/**

 * For developers: WordPress debugging mode.

 *

 * Change this to true to enable the display of notices during development.

 * It is strongly recommended that plugin and theme developers use WP_DEBUG

 * in their development environments.

 *

 * For information on other constants that can be used for debugging,

 * visit the Codex.

 *

 * @link https://codex.wordpress.org/Debugging_in_WordPress

 */

define('WP_DEBUG', false);



/* That's all, stop editing! Happy blogging. */



/** Absolute path to the WordPress directory. */

if ( !defined('ABSPATH') )

	define('ABSPATH', dirname(__FILE__) . '/');



/** Sets up WordPress vars and included files. */

require_once(ABSPATH . 'wp-settings.php');

