<?php

	function pageSlug() {
		$slug = '';

		$exploded_uri = explode('/', $_SERVER['REQUEST_URI']);

		if ($_SERVER['REQUEST_URI'] == '/') {
			$slug = 'home';
		} else {
			$slug = $exploded_uri[1];
		}

		return $slug;
	}

?>