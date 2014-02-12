<section class="content wrap-narrow">
	<h2 class="title">Tip: <?php echo html($page->title()) ?></h2>
	<?php snippet('submenu'); ?>

	<article class="tip">
		<?php echo kirbytext($page->text()) ?>
	</article>

	<?php snippet('prevnext'); ?>


</section>