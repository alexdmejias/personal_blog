<?php snippet('header') ?>
<?php $body_snippets_path = $_SERVER['DOCUMENT_ROOT']. '/site/snippets/body/'; ?>

<section class="content wrap-narrow clearfix">
	<?php if(isset($page->template->value) && (file_exists($body_snippets_path . '/tip.php'))): ?>
		<?php snippet(strtolower('body/'.$page->template->value)); ?>
	<?php else: ?>
		<?php snippet(strtolower('body/default')); ?>
	<?php endif; ?>

</section>

<?php snippet('footer') ?>