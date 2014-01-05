<nav class="menu">
  <ul>
    <?php foreach($pages->visible() AS $p): ?>
    <li><a<?php echo ($p->isOpen()) ? ' class="active"' : '' ?> href="<?php echo $p->url() ?>"><?php echo html($p->title()) ?></a></li>
    <?php endforeach ?>
  </ul>
</nav>

<?php
/*	$root = $pages->findOpen();
	if($root) {
		$items = $root->children()->visible();
	}

	if($items && $items->count() > 0){

		echo '<ul>';
		foreach ($items as $key => $value) {
			echo '<li><a href="'. $value->url() .'"> '.$value->title.'</a></li>';
		}
		echo '</ul>';
	}*/
?>