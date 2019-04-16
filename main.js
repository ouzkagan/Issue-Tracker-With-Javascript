document.getElementById("issueInputForm").addEventListener("submit",saveIssue);

function deleteIssue(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.forEach((item,index)=>{
        if(item.id == id){
            issues.splice(index,1);
            // console.log(item);
        }
    })
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
    
}
function setStatusClosed(id){
    let issues = JSON.parse(localStorage.getItem('issues'));
    issues.forEach((item,index)=>{
        if(item.id == id){
            item.status = 'Closed';
        }
    })
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
    
}
function saveIssue(e){
    let issueDesc = document.getElementById('issueDescInput').value;
    let issueSeverity = document.getElementById('issueSeverityInput').value;
    let issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null){
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }else{
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues',JSON.stringify(issues));
    }
    
    document.getElementById('issueInputForm').reset();
    fetchIssues();

    e.preventDefault();
}

function fetchIssues(){
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issueList = document.getElementById('issueList');

    issueList.innerHTML = '';

    for(let i = 0; i < issues.length; i++){
        let id = issues[i].id;
        let desc = issues[i].description;
        let severity = issues[i].severity;
        let assignedTo = issues[i].assignedTo;
        let status = issues[i].status;

        
        // issueList.innerHTML+=
        // `
        // <div class="jumbotron">
        //     <div class="well">
        //         <i><h6>Issue ID:${id}</h6></i>
        //         <p><span class="badge badge-info">${status}</span></p>
        //         <h3>${desc}</h3>
        //         <p><span class="glyphicon glyphicon-time"> ${severity}</span></p>
        //         <p><span class="glyphicon glyphicon-user">${assignedTo}</span></p>
        //         <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
        //         <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
        //     </div>
        // </div>
        // `
        
        // issueList.innerHTML+=
        // `
        // <div class="jumbotron">
        //     <div class="well">
        //         <i><h6>Issue ID:${id}</h6></i>
        //         <p><span class="badge badge-info">${status}</span></p>
        //         <h3>${desc}</h3>
        //         <p><span class="glyphicon glyphicon-time"> ${severity}</span></p>
        //         <p><span class="glyphicon glyphicon-user">${assignedTo}</span></p>
        //         <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
        //         <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
        //     </div>
        // </div>
        // `
        issueList.innerHTML+='<div class="jumbotron">'+
                            '<div class="well">'+
                            '<i><h6>Issue ID: '+ id + '</h6></i>'+
                            '<p><span class="badge badge-info">'+ status +'</span></p>'+
                            '<h3>'+desc+'</h3>'+
                            '<p><span class="glyphicon glyphicon-time">'+ severity+'</span></p>'+
                            '<p><span class="glyphicon glyphicon-user">'+ assignedTo+'</span></p>'+
                            '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                            '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                            '</div>'+
                            '</div>'

    }
}
