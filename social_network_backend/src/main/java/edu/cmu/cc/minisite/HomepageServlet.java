package edu.cmu.cc.minisite;

import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.json.JSONUtil;
import edu.cmu.cc.minisite.mongo.MongoManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Task 3:
 * Implement your logic to return all the comments authored by this user.
 *
 * You should sort the comments by ups in descending order (from the largest to the smallest one).
 * If there is a tie in the ups, sort the comments in descending order by their timestamp.
 */
public class HomepageServlet extends HttpServlet {

    /**
     * Your initialization code goes here.
     */
    public HomepageServlet() {
    }

    /**
     * Implement this method.
     *
     * @param request  the request object that is passed to the servlet
     * @param response the response object that the servlet
     *                 uses to return the headers to the client
     * @throws IOException      if an input or output error occurs
     * @throws ServletException if the request for the HEAD
     *                          could not be handled
     */
    @Override
    protected void doGet(final HttpServletRequest request,
                         final HttpServletResponse response) throws ServletException, IOException {

        JsonObject result = new JsonObject();
        String id = request.getParameter("id");
        // TODO: To be implemented
//        result = JSONUtil.getCommentJson(MongoManager.getComments(id));
        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write(result.toString());
        writer.close();
    }
}

