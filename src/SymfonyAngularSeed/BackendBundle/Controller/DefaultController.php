<?php

namespace SymfonyAngularSeed\BackendBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

/**
 * @Route("/login")
 */
class DefaultController extends Controller
{
	/**
	 * @Route("/{error}", requirements={"error" = "\w+"})
	 */
    public function indexAction($error)
    {
        return $this->render('BackendBundle:Default:index.html.twig', array('error' => $error));
    }
}
