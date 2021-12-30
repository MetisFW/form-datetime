<?php

namespace MetisFW\FormDateTime\DI;

use Nette;
use Nette\DI;
use Nette\PhpGenerator as Code;

class FormDateTimeExtension extends DI\CompilerExtension
{
	/**
	 * @param Code\ClassType $class
	 */
	public function afterCompile(Code\ClassType $class)
	{
		parent::afterCompile($class);

		$initialize = $class->methods['initialize'];
		$initialize->addBody('MetisFW\FormDateTime\Controls\Date::register();');
		$initialize->addBody('MetisFW\FormDateTime\Controls\DateTime::register();');
		$initialize->addBody('MetisFW\FormDateTime\Controls\Time::register();');
	}
}