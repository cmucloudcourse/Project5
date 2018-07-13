package edu.cmu.cc.minisite;

import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.hbase.BigtableHelper;
import edu.cmu.cc.minisite.mongo.MongoManager;
import edu.cmu.cc.minisite.mysql.MysqlManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

/**
 * Task 4 (1):
 * Get the name and profile of the user as you did in Task 1
 * Put them as fields in the result JSON object
 *
 * Task 4 (2);
 * Get the follower name and profiles as you did in Task 2
 * Put them in the result JSON object as one array
 *
 * Task 4 (3):
 * Get the 30 most popular followee comments and put them in the
 * result JSON object as one array.
 * (Remember also find the parent and grandparent of them)
 *
 * The posts should be sorted:
 * First by ups in descending order.
 * Break tie by their timestamp in descending order.
 */
public class TimelineServlet extends HttpServlet {

    /**
     * Your initialization code goes here.
     */
    public TimelineServlet() throws SQLException, ClassNotFoundException, IOException {
        MysqlManager.initializeConnection();
        BigtableHelper.connect();
        MongoManager.getMongoClient();

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
        result = TimelineCreater.creteTimeline(id);
        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        writer.print(result.toString());
        writer.close();
    }
}

