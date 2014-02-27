<?php

	function enviroment() {
		$envs = [
			[
				'name' => 'local',
				'address' => 'blog.dev',
				'js_type' => '.concat'
			],
			[
				'name' => 'staging',
				'address' => 'dev.alexdmejias.com',
				'js_type' => '.concat'
			],
			[
				'name' => 'prod',
				'address' => 'alexdmejias.com',
				'js_type' => '.min'
			]
		];
		$current_server = $_SERVER['SERVER_NAME'];

		foreach ($envs as $env => $key) {
			if ($key['address'] == $_SERVER['SERVER_NAME']) {
				$current_env = $env;
			}
		}

		$object = new stdClass();
		foreach ($envs[$current_env] as $key => $value) {
			$object->$key = $value;
		}

		global $site;
		$site->env_vars = $object;

	}

?>