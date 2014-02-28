<?php

class kirbytextExtended extends kirbytext {

	function __construct($text, $markdown=true) {

		parent::__construct($text, $markdown);

		// define custom tags
		$this->addTags('resimage');
		$this->addAttributes('alt');

	}

	function resimage($params) {

		$sizes = [
			['small' , ''],
			['medium', 400],
			['large', 800],
			['xlarge', 1200]
		];

		$image = $params['resimage'];

		// define default values for attributes
		$defaults = array(
			'image' => '/assets/images/content/sized/'.$image,
			'alt' => 'No description provided',
		);

		// merge the given parameters with the default values
		$options = array_merge($defaults, $params);

		$image_parts = explode('.', $options['image']);

		$markup = '<span data-picture data-alt="'.$options['alt'].'">'.
					'<span data-src="'.$image_parts[0].'-small.'.$image_parts[1].'"></span>'.
					'<span data-src="'.$image_parts[0].'-medium.'.$image_parts[1].'" data-media="(min-width: 400px)"></span>'.
					'<span data-src="'.$image_parts[0].'-large.'.$image_parts[1].'" data-media="(min-width: 800px)"></span>'.
					'<span data-src="'.$image_parts[0].'-xlarge.'.$image_parts[1].'" data-media="(min-width: 1200px)"></span>'.
			        '<noscript>'.
			            '<img src="'.$options['image'].'" alt="'.$options['alt'].'">'.
			        '</noscript>'.
				   '</span>';

		return $markup;

	}
}

?>
