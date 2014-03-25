<?php

class kirbytextExtended extends kirbytext {

	function __construct($text, $markdown=true) {

		parent::__construct($text, $markdown);

		// define custom tags
		$this->addTags('resimage');
		$this->addAttributes('alt');

		$this->addTags('image');

	}

	function resimage($params) {

		$sizes = [
			['small' , ''],
			['medium', 400],
			['large', 800],
			['xlarge', 1200]
		];

		$image = $params['resimage'];

		// grab the assets url from the enviroments array
		global $site;
		$assets_url = $site->env_vars->assets_url;
		// define default values for attributes

		$defaults = array(
			'image' => $assets_url.'/images/content/sized/'.$image,
			'alt' => '',
		);

		// merge the given parameters with the default values
		$options = array_merge($defaults, $params);

		$image_parts = explode('.', $options['image']);

		$markup = '<figure><span data-picture data-alt="'.$options['alt'].'">'.
					'<span data-src="'.$image_parts[0].'-small.'.$image_parts[1].'"></span>'.
					'<span data-src="'.$image_parts[0].'-medium.'.$image_parts[1].'" data-media="(min-width: 400px)"></span>'.
					'<span data-src="'.$image_parts[0].'-large.'.$image_parts[1].'" data-media="(min-width: 800px)"></span>'.
					'<span data-src="'.$image_parts[0].'-xlarge.'.$image_parts[1].'" data-media="(min-width: 1200px)"></span>'.
					'</span>'.
					(!empty($options['alt']) ? '<figcaption><span>'.$options['alt'].'</span></figcaption>' : '') .
					'</figure>';

		return $markup;

	}

	function image($params) {

		global $site;
		$assets_url = $site->env_vars->assets_url;

		$image = $params['image'];

		return '<img src="'.$assets_url. '/images' . $image.'" alt="" />';
	}
}

?>
