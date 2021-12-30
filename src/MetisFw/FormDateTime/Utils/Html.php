<?php

namespace MetisFW\FormDateTime\FormDateTime\Utils;

use Nette;
use Nette\Utils;
use Nette\Bridges;

class Html extends Utils\Html
{
	/**
	 * Inserts child node.
	 *
	 * @param int
	 * @param Utils\Html|Bridges\ApplicationLatte\Template|string node
	 * @param bool
	 *
	 * @return $this
	 *
	 * @throws \Exception
	 */
	public function insert($index, $child, $replace = FALSE)
	{
		if ($child instanceof Bridges\ApplicationLatte\Template) {
			// Append
			if ($index === NULL) {
				$this->children[] = $child;

			// Insert or replace
			} else {
				array_splice($this->children, (int) $index, $replace ? 1 : 0, [$child]);
			}

		} else {
			parent::insert($index, $child, $replace);
		}

		return $this;
	}

	/**
	 * Renders element's start tag, content and end tag
	 *
	 * @param int $indent
	 *
	 * @return string
	 */
	public function render($indent = NULL)
	{
		$s = $this->startTag();

		if (!$this->isEmpty) {
			// Add content
			if ($indent !== NULL) {
				$indent++;
			}

			foreach ($this->children as $child) {
				if ($child instanceof Bridges\ApplicationLatte\Template) {
					// Check if date input is created...
					if (isset($child->dateInput)) {
						// ...pass form element attributes to date input element
						$child->dateInput->addAttributes($this->attrs);
					}

					// Check if time input is created...
					if (isset($child->timeInput)) {
						// ...pass form element attributes to time input element
						$child->timeInput->addAttributes($this->attrs);
					}

					// Render template into string
					$s .= (string) $child;

				} else if (is_object($child)) {
					$s .= $child->render($indent);

				} else {
					$s .= $child;
				}
			}

			// add end tag
			$s .= $this->endTag();
		}

		if ($indent !== NULL) {
			return "\n" . str_repeat("\t", $indent - 1) . $s . "\n" . str_repeat("\t", max(0, $indent - 2));
		}

		return $s;
	}
}
