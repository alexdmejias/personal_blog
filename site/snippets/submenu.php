<?php
	if($page->hasChildren() ) {
		$children = $page->children();
		echo '<ul role="navigation">';
		foreach ($page->children() as $key) {
			echo '<li><a href="'. $key->url() .'"> '.$key->title.'</a></li>';
		}
		echo '</ul>';
	}
?>