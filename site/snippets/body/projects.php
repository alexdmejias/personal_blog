<section class="content wrap">
	<h2 class="title"><?php echo html($page->title()) ?></h2>

	<article>
	<?php echo kirbytext($page->text()) ?>

	<?php
		if($page->hasChildren() ) {
			$children = $page->children();
			echo '<div class="projects clearfix">';
			foreach ($page->children() as $key) {
				$proj_type = $key->project_type ? ' ' . $key->project_type : '';

				/*************/
				/* Only for testing */
				/*************/
				$sample_topics = array('abstract', 'food', 'sports', 'animals', 'nature');
				$topic = $sample_topics[rand(0, count($sample_topics) - 1)];
				/*************/
				/* Only for testing */
				/*************/

				echo
					'<div class="project'. $proj_type .'" style="background-image:url(http://lorempixel.com/200/300/'. $topic.')" ><a href="'. $key->url() .'"> '.
					'<h5>'.$key->title.'</h5>'.
					'<p>'.$key->excerpt.'</p>'.
					'</a></div>';
			}
			echo '</div>';
		}
	?>

	</article>

	<?php snippet('prevnext'); ?>


</section>