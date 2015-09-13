<section class="content wrap-narrow clearfix">
	<h2 class="title"><?php echo html($page->title()) ?>
		<?php if($page->url): ?>
			<span>
				<a class="button fz-half" target="_blank" href="<?php echo $page->url; ?>">Visit Project</a>
			</span>
		<?php endif; ?>
		<?php if($page->github): ?>
			<span>
				<a class="button fz-half" target="_blank" href="<?php echo $page->github; ?>">Github</a>
			</span>
		<?php endif; ?>
	</h2>
	<?php snippet('submenu'); ?>

	<article>
		<?php echo kirbytext($page->text()) ?>
	</article>

	<?php snippet('prevnext'); ?>

</section>