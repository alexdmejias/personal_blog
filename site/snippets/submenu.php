<?php
	if($page->hasChildren() ) {
		$children = $page->children();
		foreach ($page->children() as $key) {
			echo '<li><a href="'. $key->url() .'"> '.$key->title.'</a></li>';
		}
	}
?>