<?php snippet('header') ?>
<?php $body_snippets_path = $_SERVER['DOCUMENT_ROOT']. '/site/snippets/body/'; ?>

<section class="content wrap-narrow clearfix">
	<h2 class="title"><?php echo html($page->title()) ?></h2>
	<?php
		snippet('submenu');

		if (isset($page->template->value) && (file_exists($body_snippets_path . '/tip.php'))) {
			snippet(strtolower('body/'.$page->template->value));
		} else {
			snippet(strtolower('body/default'));
		}

	?>
	<nav>
		<?php
			if ($page->parent()) {
				if ($page->hasPrev()) {
					echo '<a href="'.$page->prev()->url().'">&laquo; Prev: '.$page->prev()->title().'</a>';
				}

				if ($page->hasNext()) {
					echo '<a href="'.$page->next()->url().'">Next: '.$page->next()->title().' &raquo;</a>';
				}
			}
		?>
	</nav>


</section>

<?php snippet('footer') ?>