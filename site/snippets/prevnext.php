<?php if ($page->parent()): ?>
	<nav>
		<?php
			if ($page->hasPrevVisible()) {
				echo '<a href="'.$page->prev()->url().'">&laquo; Prev: '.$page->prev()->title().'</a>';
			}

			if ($page->hasNextVisible()) {
				echo '<a href="'.$page->next()->url().'">Next: '.$page->next()->title().' &raquo;</a>';
			}
		?>
	</nav>
<?php endif; ?>