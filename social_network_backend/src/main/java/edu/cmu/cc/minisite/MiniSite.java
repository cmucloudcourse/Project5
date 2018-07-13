package edu.cmu.cc.minisite;

import io.undertow.Handlers;
import io.undertow.Undertow;
import io.undertow.server.HttpHandler;
import io.undertow.server.handlers.PathHandler;
import io.undertow.servlet.api.DeploymentInfo;
import io.undertow.servlet.api.DeploymentManager;

import javax.servlet.ServletException;

import static io.undertow.servlet.Servlets.defaultContainer;
import static io.undertow.servlet.Servlets.deployment;
import static io.undertow.servlet.Servlets.servlet;

/**
 * You don't have to modify this file.
 */
public class MiniSite {

    /**
     * The constructor.
     */
    public MiniSite() {

    }

    /**
     * Base path.
     */
    public static final String PATH = "/MiniSite";

    public static void main(String[] args) {
        try {
            DeploymentInfo servletBuilder = deployment()
                    .setClassLoader(MiniSite.class.getClassLoader())
                    .setContextPath(PATH)
                    .setDeploymentName("handler.war")
                    .addServlets(
                            servlet("TimelineServlet", TimelineServlet.class)
                                    .addMapping("/task4"),
                            servlet("HomepageServlet", HomepageServlet.class)
                                    .addMapping("/task3"),
                            servlet("FollowerServlet", FollowerServlet.class)
                                    .addMapping("/task2"),
                            servlet("ProfileServlet", ProfileServlet.class)
                                    .addMapping("/task1")
                    );


            DeploymentManager manager = defaultContainer().addDeployment(servletBuilder);
            manager.deploy();

            HttpHandler servletHandler = manager.start();
            PathHandler path = Handlers.path(Handlers.redirect(PATH))
                    .addPrefixPath(PATH, servletHandler);

            Undertow server = Undertow.builder()
                    .addHttpListener(8080, "0.0.0.0")
                    .setHandler(path)
                    .build();
            server.start();
        } catch (ServletException e) {
            throw new RuntimeException(e);
        }
    }
}

