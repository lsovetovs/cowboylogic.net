import styles from "./Education.module.css";



export default function Education() {
    return (
        <div className={styles.container}>
            <h1>Education</h1>
            <p>SCHOOL NAME, LOCATION, DEGREE
                <ul>
                    <li>The University of Phoenix, Phoenix Arizona – MBA-CB, GPA 4.0 Master’s in
                         Business Administration – Competency Based – specialized in competency-based, 
                         post-pandemic leadership including consideration for remote workers, 
                         back to the office, the great resignation, cross-generational dynamics, 
                         global considerations for social, political, economic, and environmental 
                         effects on market strategies, leadership styles, human resources, and competitive approaches</li>
                    <li>University of Phoenix – Phoenix, Arizona – BSBM, GPA 3.9, bachelor’s in business management</li>
                    <li>Royal Roads University, Victoria, BC, Canada – Associates, Computer Sciences – Network Engineering</li>
                    <li>International Institute of Success, Nanaimo, BC, Canada – Advanced Certification in Business Management</li>
                    <li>Microsoft, Redmond, WA, USA – MCP, MCSE, MCT</li>
                </ul>
            </p>
        </div>
    )
}