package com.ssun.tctool.view.workspace;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WorkspaceView {

    @GetMapping(path = {"/workspaces", "/"})
    public String list() {
        return "/html/workspace/list.html";
    }
}
