import { useState ,useMemo} from "react";
import { useNavigate, useParams } from "react-router-dom";
import  API from "../../api/axios";
function InterviewScheduler() {
  const [scheduledDate, setScheduledDate] = useState("");
  const [format, setFormat] = useState("In-person");
  const [link, setLink] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const { studentId, applicationId } = useParams();
 const companyid = useMemo(() => {
    const companyData = JSON.parse(localStorage.getItem("companyData"));
    return companyData ? companyData.companyId : "";
  }, []);


  const handleSchedule = async() => {
    // Mock API call to schedule interview
   try {
      await API.post("/company/schedule-interview",{ applicationId, scheduledDate, format,feedback,link,companyid })
      .then((response) => {
       
        alert("Interview Scheduled!");
        setTimeout(() => {
          navigate(`/company/dashboard/job-application`);
        }, 3000)
      }).catch((error) => {
        console.log(error)
      })
     
   } catch (error) {
     console.log(error)
    
   }
    // Reset form
    setScheduledDate("");
    setFormat("In-person");
    setLink("");
    setFeedback("");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold">Interview Scheduling</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Select Date and Time
        </label>
        <input
          type="datetime-local"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          required
          className="mt-1 p-2 border w-full rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Interview Format
        </label>
        <select
          value={format}
          required
          onChange={(e) => setFormat(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
        >
          <option>In-person</option>
          <option>Virtual</option>
        </select>
      </div>

      {format === "Virtual" && (
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Virtual Link
          </label>
          <input
            type="url"
            placeholder="Add meeting link"
            required
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Feedback/Notes
        </label>
        <textarea
          placeholder="Add any additional notes or feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
          rows="3"
        />
      </div>

      <button
        onClick={handleSchedule}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Schedule Interview
      </button>
    </div>
  );
}

export default InterviewScheduler;