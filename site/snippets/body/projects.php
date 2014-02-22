<section class="content wrap">
	<h2 class="title">
		<?php echo html($page->title()) ?>
		<?php
			$children = $page->children();
			foreach ($children as $key) {
				echo '<a href="#'.strtolower(str_replace(' ', '_', $key->title)).'">'.$key->title.'</a>';
			}
		?>
	</h2>
	<article>
		<?php

			echo kirbytext($page->text());

			echo '<div class="projects clearfix">';
			foreach ($page->children() as $child) {

				echo '<div class="clearfix">';
				echo '<h3 id="'.strtolower(str_replace(' ', '_', $child->title)).'">'.$child->title.'</h3>';
				echo kirbytext($child->text());
				foreach ($child->children() as $grandchild) {
					/*************/
					/* Only for testing */
					/*************/
					$sample_topics = array('abstract', 'food', 'sports', 'animals', 'nature');
					$topic = $sample_topics[rand(0, count($sample_topics) - 1)];
					/*************/
					/* Only for testing */
					/*************/
					echo
						'<div class="project" style="background-image:url(http://lorempixel.com/200/300/'. $topic.')" ><a href="'. $grandchild->url() .'"> '.
						'<h5>'.$grandchild->title.'</h5>'.
						'<p>'.$grandchild->excerpt.'</p>'.
						'</a></div>';
				}
				echo '</div>';
			}
			echo '</div>';
		?>

	</article>

	<?php snippet('prevnext'); ?>


</section>