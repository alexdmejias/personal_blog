<?php

	function enviroment() {
		require '_env-vars.php';

		$current_server = $_SERVER['SERVER_NAME'];

		foreach ($env_vars as $env => $key) {
			if ($key['address'] == $_SERVER['SERVER_NAME']) {
				$current_env = $env;
			}
		}

		$object = new stdClass();
		foreach ($env_vars[$current_env] as $key => $value) {
			$object->$key = $value;
		}

		global $site;
		$site->env_vars = $object;

	}

?>