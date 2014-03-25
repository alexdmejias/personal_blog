<?php

	$env_vars = [
		[
			'name' => 'local',
			'address' => 'blog.dev',
			'js_type' => '.concat',
			'css_type' => '',
			'assets_url' => '/assets'
		],
		[
			'name' => 'staging',
			'address' => 'dev.alexdmejias.com',
			'js_type' => '.concat',
			'css_type' => '',
			'assets_url' => '/assets'
		],
		[
			'name' => 'prod',
			'address' => 'alexdmejias.com',
			'js_type' => '.min',
			'css_type' => '.min',
			'assets_url' => 'https://s3.amazonaws.com/alexdmejias.com/alexdmejias.com/assets'
		]
	];
?>