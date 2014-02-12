<nav>
    <?php foreach($pages->visible() AS $p): ?>
    	<a<?php echo ($p->isOpen()) ? ' class="active"' : '' ?> href="<?php echo $p->url() ?>"><?php echo html($p->title()) ?></a>
    <?php endforeach ?>
</nav>