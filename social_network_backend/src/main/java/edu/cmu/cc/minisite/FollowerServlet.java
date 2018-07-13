package edu.cmu.cc.minisite;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import edu.cmu.cc.minisite.hbase.BigtableHelper;
import edu.cmu.cc.minisite.json.JSONUtil;
import edu.cmu.cc.minisite.mysql.MysqlManager;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Task 2:
 * Implement your logic to retrieve the followers of this user.
 * You need to send back the Name and Profile Image URL of his/her Followers.
 *
 * You should sort the followers alphabetically in ascending order by Name.
 */
public class FollowerServlet extends HttpServlet {

    /**
     * Your initialization code goes here.
     */
    public FollowerServlet() throws IOException, SQLException, ClassNotFoundException {
        BigtableHelper.connect();
        MysqlManager.initializeConnection();
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
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {
        JsonObject result;
        String id = request.getParameter("id");
        // TODO: To be implemented
        result = getFollowers(id);

        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter writer = response.getWriter();
        writer.write(result.toString());
        writer.close();
    }

    private JsonObject getFollowers(String id) throws IOException {
        JsonObject result;
        List<String> followers = BigtableHelper.getFollowers(id);
        System.out.println("List of followers from HBASE " +String.join(", ", followers));
        if(followers.isEmpty()){
            result=JSONUtil.getEmptyFollowerList();
        }else{
            Collections.sort(followers,String.CASE_INSENSITIVE_ORDER);
            Map<String, String> followerMap = MysqlManager.getProfilePhotos(followers);

            result = JSONUtil.getFollowerJSON(followerMap);
        }
        return result;
    }
}


