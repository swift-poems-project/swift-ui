import React from 'react'
import Link from 'react-router/lib/Link'

const T = React.PropTypes

const Content = React.createClass({
    render: function () {
      	return (
		<div>
		  <div className="container-fluid">
		    <h1>Swift Poems Project</h1>
		  </div>
		  <div className="container-fluid" id="project-logo">
		    <img src={`${process.env.API_BASE_URL}/static/img/jonathan_swift.png`} alt="Swift Poems Project" />
		  </div>
		  <div className="container-fluid">
		    <p>The Swift Poems Project, led by Professor Emeritus of English James Woolley of Lafayette College, and Associate Professor of English Stephen Karian at the University of Missouri, has as its objectives the aggregation, transcription, and critical annotation of the poetic works of Jonathan Swift. Beginning in 1987, the SPP, using the DOS-based word-processing software called Nota Bene, has amassed more than 6500 digital transcripts of Swift’s poems as they stand in eighteenth-century printed and manuscript sources. In 2012, the National Endowment for the Humanities awarded the SPP a Scholarly Editions Grant to prepare a digital archival edition to support the SPP’s forthcoming printed edition, as part of the Cambridge Works of Jonathan Swift (Cambridge University Press). For the purposes of developing this digital edition, Lafayette College’s Digital Scholarship Services (DSS) department has automated the encoding of all SPP transcriptions into a TEI-P5 schema. We intend to preserve these resources within the institution’s digital object repository, on top of which we are developing an interactive user interface (UI) for the digital edition.</p>
		  </div>
		</div>
	)
    }
})

export default Content
