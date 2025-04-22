import React, { useState, useEffect, useRef } from 'react';
import { Camera, Save, Download, CheckCircle, Square, Info, X, Plus } from 'lucide-react';

const RaceInspectionApp = () => {
  // Initial checklist items with detailed motorsport-specific inspection points
  const defaultChecklist = [
    { id: 1, title: 'Driver Safety Equipment', tasks: [
      { id: 'task1-1', text: 'Helmet (FIA/Snell rating, damage check, visor condition)', completed: false, notes: '', photos: [] },
      { id: 'task1-2', text: 'HANS/FHR device (straps, tethers, mounting points)', completed: false, notes: '', photos: [] },
      { id: 'task1-3', text: 'Race suit & underwear (FIA rating, condition, fit)', completed: false, notes: '', photos: [] },
      { id: 'task1-4', text: 'Gloves & boots (material condition, stitching)', completed: false, notes: '', photos: [] },
      { id: 'task1-5', text: 'Harness/seatbelt (FIA date validation, mounting points, latch mechanism)', completed: false, notes: '', photos: [] }
    ]},
    { id: 2, title: 'Vehicle Safety Systems', tasks: [
      { id: 'task2-1', text: 'Fire extinguisher/suppression system (pressure, mounting, activation)', completed: false, notes: '', photos: [] },
      { id: 'task2-2', text: 'Roll cage/ROPS (mounting points, padding, deformation)', completed: false, notes: '', photos: [] },
      { id: 'task2-3', text: 'Driver\'s seat (FIA approval, mounting, rails, condition)', completed: false, notes: '', photos: [] },
      { id: 'task2-4', text: 'Window nets/arm restraints (condition, mounting, operation)', completed: false, notes: '', photos: [] },
      { id: 'task2-5', text: 'Kill switch/isolation (electrical & fuel, functionality, access)', completed: false, notes: '', photos: [] }
    ]},
    { id: 3, title: 'Chassis & Exterior', tasks: [
      { id: 'task3-1', text: 'Bodywork integrity (mounting points, damage, fasteners)', completed: false, notes: '', photos: [] },
      { id: 'task3-2', text: 'Aerodynamic components (wings, splitters, diffusers, damage)', completed: false, notes: '', photos: [] },
      { id: 'task3-3', text: 'Door/hood/trunk latches (security, functionality)', completed: false, notes: '', photos: [] },
      { id: 'task3-4', text: 'Competition number & required decals (visibility, placement)', completed: false, notes: '', photos: [] },
      { id: 'task3-5', text: 'Vehicle weight (minimum weight compliance, ballast mounting)', completed: false, notes: '', photos: [] }
    ]},
    { id: 4, title: 'Suspension & Steering', tasks: [
      { id: 'task4-1', text: 'Suspension components (cracks, bends, play in joints)', completed: false, notes: '', photos: [] },
      { id: 'task4-2', text: 'Shock absorbers/springs (leaks, mounting, travel)', completed: false, notes: '', photos: [] },
      { id: 'task4-3', text: 'Steering components (rack, arms, tie-rods, excessive play)', completed: false, notes: '', photos: [] },
      { id: 'task4-4', text: 'Wheel bearings (excessive play, noise, heat)', completed: false, notes: '', photos: [] },
      { id: 'task4-5', text: 'Ride height (minimum compliance, vehicle attitude)', completed: false, notes: '', photos: [] }
    ]},
    { id: 5, title: 'Braking System', tasks: [
      { id: 'task5-1', text: 'Brake pads/discs (thickness, wear pattern, cracks)', completed: false, notes: '', photos: [] },
      { id: 'task5-2', text: 'Brake lines & hoses (leaks, chafing, mounting)', completed: false, notes: '', photos: [] },
      { id: 'task5-3', text: 'Brake calipers (mounting, piston operation, pad retaining pins)', completed: false, notes: '', photos: [] },
      { id: 'task5-4', text: 'Brake fluid (level, condition, boiling point)', completed: false, notes: '', photos: [] },
      { id: 'task5-5', text: 'Brake balance adjustment (bias valve, proportioning)', completed: false, notes: '', photos: [] }
    ]},
    { id: 6, title: 'Wheels & Tires', tasks: [
      { id: 'task6-1', text: 'Wheels (damage, cracks, valve stems, balance weights)', completed: false, notes: '', photos: [] },
      { id: 'task6-2', text: 'Wheel nuts/studs (torque, thread condition, locking method)', completed: false, notes: '', photos: [] },
      { id: 'task6-3', text: 'Tire specification (correct compound, size, direction)', completed: false, notes: '', photos: [] },
      { id: 'task6-4', text: 'Tire condition (cuts, punctures, flat spots, blistering)', completed: false, notes: '', photos: [] },
      { id: 'task6-5', text: 'Tire pressures (hot/cold measurements, adjustments)', completed: false, notes: '', photos: [] }
    ]},
    { id: 7, title: 'Drivetrain & Transmission', tasks: [
      { id: 'task7-1', text: 'Clutch (operation, free play, fluid leaks)', completed: false, notes: '', photos: [] },
      { id: 'task7-2', text: 'Gearbox (operation, mounting, leaks)', completed: false, notes: '', photos: [] },
      { id: 'task7-3', text: 'Driveshaft/axles (CV boots, play, mounting)', completed: false, notes: '', photos: [] },
      { id: 'task7-4', text: 'Differential (mounting, operation, leaks)', completed: false, notes: '', photos: [] },
      { id: 'task7-5', text: 'Transmission & differential fluid (level, condition)', completed: false, notes: '', photos: [] }
    ]},
    { id: 8, title: 'Engine & Cooling', tasks: [
      { id: 'task8-1', text: 'Engine bay inspection (leaks, mounting, belt condition)', completed: false, notes: '', photos: [] },
      { id: 'task8-2', text: 'Oil level & condition (contamination, pressure)', completed: false, notes: '', photos: [] },
      { id: 'task8-3', text: 'Cooling system (radiator, hoses, cap, coolant level)', completed: false, notes: '', photos: [] },
      { id: 'task8-4', text: 'Air intake system (filter, ducting, airbox)', completed: false, notes: '', photos: [] },
      { id: 'task8-5', text: 'Exhaust system (mounting, leaks, silencer)', completed: false, notes: '', photos: [] }
    ]},
    { id: 9, title: 'Fuel System', tasks: [
      { id: 'task9-1', text: 'Fuel tank/cell (FIA certification, mounting, date validation)', completed: false, notes: '', photos: [] },
      { id: 'task9-2', text: 'Fuel lines & connections (high-pressure fittings, routing)', completed: false, notes: '', photos: [] },
      { id: 'task9-3', text: 'Fuel pump & filter (operation, mounting)', completed: false, notes: '', photos: [] },
      { id: 'task9-4', text: 'Fuel sample port (accessibility, functionality)', completed: false, notes: '', photos: [] },
      { id: 'task9-5', text: 'Fuel level & type (correct specification, contamination)', completed: false, notes: '', photos: [] }
    ]},
    { id: 10, title: 'Electrical System', tasks: [
      { id: 'task10-1', text: 'Battery (mounting, terminal protection, charging)', completed: false, notes: '', photos: [] },
      { id: 'task10-2', text: 'Wiring harness (chafing, proper routing, connections)', completed: false, notes: '', photos: [] },
      { id: 'task10-3', text: 'ECU & data systems (mounting, programming, sealing)', completed: false, notes: '', photos: [] },
      { id: 'task10-4', text: 'Lighting systems (headlights, brake lights, rain light)', completed: false, notes: '', photos: [] },
      { id: 'task10-5', text: 'Sensors & actuators (functionality, calibration)', completed: false, notes: '', photos: [] }
    ]},
    { id: 11, title: 'Cockpit & Controls', tasks: [
      { id: 'task11-1', text: 'Steering wheel (quick release, buttons, grips)', completed: false, notes: '', photos: [] },
      { id: 'task11-2', text: 'Pedals (operation, adjustment, mounting)', completed: false, notes: '', photos: [] },
      { id: 'task11-3', text: 'Dashboard/instruments (functionality, visibility)', completed: false, notes: '', photos: [] },
      { id: 'task11-4', text: 'Interior panels & trim (mounting, sharp edges)', completed: false, notes: '', photos: [] },
      { id: 'task11-5', text: 'Camera/timing systems (mounting, power supply)', completed: false, notes: '', photos: [] }
    ]},
    { id: 12, title: 'Technical Compliance', tasks: [
      { id: 'task12-1', text: 'Scrutineering seals & markings (present, unbroken)', completed: false, notes: '', photos: [] },
      { id: 'task12-2', text: 'Homologation papers/technical passport (current, matching)', completed: false, notes: '', photos: [] },
      { id: 'task12-3', text: 'Restrictor/BoP compliance (size, sealing)', completed: false, notes: '', photos: [] },
      { id: 'task12-4', text: 'Noise test compliance (db level, measurement)', completed: false, notes: '', photos: [] },
      { id: 'task12-5', text: 'Data logging retrieval (files, parameters)', completed: false, notes: '', photos: [] }
    ]}
  ];

  // Student information
  const defaultStudentInfo = {
    name: '',
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    vehicleId: '',
    raceEvent: '',
    carClass: '',
    teamName: '',
    scrutineerName: ''
  };

  // State variables
  const [checklist, setChecklist] = useState(defaultChecklist);
  const [studentInfo, setStudentInfo] = useState(defaultStudentInfo);
  const [activeCamera, setActiveCamera] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedChecklist = localStorage.getItem('raceInspectionChecklist');
    const savedStudentInfo = localStorage.getItem('raceInspectionStudentInfo');
    
    if (savedChecklist) {
      try {
        setChecklist(JSON.parse(savedChecklist));
      } catch (e) {
        console.error('Failed to load saved checklist:', e);
      }
    }
    
    if (savedStudentInfo) {
      try {
        setStudentInfo(JSON.parse(savedStudentInfo));
      } catch (e) {
        console.error('Failed to load saved student info:', e);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('raceInspectionChecklist', JSON.stringify(checklist));
  }, [checklist]);

  useEffect(() => {
    localStorage.setItem('raceInspectionStudentInfo', JSON.stringify(studentInfo));
  }, [studentInfo]);

  // Clean up camera when component unmounts or camera changes
  useEffect(() => {
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  // Handle task toggle
  const toggleTask = (sectionId, taskId) => {
    setChecklist(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map(task => 
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          };
        }
        return section;
      })
    );
  };

  // Handle notes change
  const updateNotes = (sectionId, taskId, notes) => {
    setChecklist(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map(task => 
              task.id === taskId ? { ...task, notes } : task
            )
          };
        }
        return section;
      })
    );
  };

  // Handle student info change
  const updateStudentInfo = (field, value) => {
    setStudentInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Camera functions
  const startCamera = async (sectionId, taskId) => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      mediaStreamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      
      setActiveCamera({ sectionId, taskId });
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Failed to access camera. Please check permissions and try again.');
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !activeCamera) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    
    const imgDataUrl = canvas.toDataURL('image/jpeg');
    
    addPhotoToTask(activeCamera.sectionId, activeCamera.taskId, imgDataUrl);
    stopCamera();
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setActiveCamera(null);
  };

  // Handle file uploads
  const handleFileUpload = (sectionId, taskId, event) => {
    const file = event.target.files[0];
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      addPhotoToTask(sectionId, taskId, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  // Add photo to task
  const addPhotoToTask = (sectionId, taskId, photoDataUrl) => {
    setChecklist(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map(task => {
              if (task.id === taskId) {
                return { 
                  ...task, 
                  photos: [...task.photos, { id: Date.now(), dataUrl: photoDataUrl }] 
                };
              }
              return task;
            })
          };
        }
        return section;
      })
    );
  };

  // Remove photo from task
  const removePhoto = (sectionId, taskId, photoId) => {
    setChecklist(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            tasks: section.tasks.map(task => {
              if (task.id === taskId) {
                return { 
                  ...task, 
                  photos: task.photos.filter(photo => photo.id !== photoId) 
                };
              }
              return task;
            })
          };
        }
        return section;
      })
    );
  };

  // Calculate progress
  const calculateProgress = () => {
    let total = 0;
    let completed = 0;
    
    checklist.forEach(section => {
      section.tasks.forEach(task => {
        total++;
        if (task.completed) {
          completed++;
        }
      });
    });
    
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  // Generate and download report
  const generateReport = () => {
    // Create a styled HTML document for the report
    let reportContent = `
      <html>
      <head>
        <title>Post-Race Inspection Report</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #333; text-align: center; }
          .header-info { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
          .header-info div { margin-bottom: 10px; }
          .header-info label { font-weight: bold; }
          .section { margin-bottom: 30px; }
          .section-title { background-color: #f0f0f0; padding: 8px; margin-bottom: 10px; }
          .task { border: 1px solid #ddd; padding: 10px; margin-bottom: 10px; }
          .task-header { display: flex; align-items: center; margin-bottom: 8px; }
          .task-status { margin-right: 10px; font-weight: bold; color: green; }
          .task-status.incomplete { color: red; }
          .task-notes { background-color: #f9f9f9; padding: 8px; margin-top: 8px; border-left: 3px solid #ddd; }
          .photos { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px; }
          .photo { max-width: 200px; max-height: 200px; border: 1px solid #ddd; }
          .progress-bar { height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 20px 0; }
          .progress-fill { height: 100%; background-color: #4caf50; border-radius: 10px; }
          .signature-area { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
          .signature-line { margin-top: 50px; border-top: 1px solid #000; width: 300px; }
        </style>
      </head>
      <body>
        <h1>Post-Race Inspection Report</h1>
        
        <div class="header-info">
          <div><label>Student Name:</label> ${studentInfo.name || 'Not provided'}</div>
          <div><label>Student ID:</label> ${studentInfo.studentId || 'Not provided'}</div>
          <div><label>Date:</label> ${studentInfo.date || 'Not provided'}</div>
          <div><label>Vehicle ID:</label> ${studentInfo.vehicleId || 'Not provided'}</div>
          <div><label>Race Event:</label> ${studentInfo.raceEvent || 'Not provided'}</div>
          <div><label>Car Class:</label> ${studentInfo.carClass || 'Not provided'}</div>
          <div><label>Team Name:</label> ${studentInfo.teamName || 'Not provided'}</div>
          <div><label>Scrutineer Name:</label> ${studentInfo.scrutineerName || 'Not provided'}</div>
        </div>
        
        <div class="progress-section">
          <h2>Inspection Progress: ${calculateProgress()}%</h2>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${calculateProgress()}%;"></div>
          </div>
        </div>
    `;

    // Add each section and its tasks
    checklist.forEach(section => {
      reportContent += `
        <div class="section">
          <h2 class="section-title">${section.title}</h2>
      `;
      
      section.tasks.forEach(task => {
        reportContent += `
          <div class="task">
            <div class="task-header">
              <span class="task-status ${task.completed ? 'complete' : 'incomplete'}">
                ${task.completed ? '✓' : '✗'}
              </span>
              <span class="task-text">${task.text}</span>
            </div>
        `;
        
        if (task.notes) {
          reportContent += `
            <div class="task-notes">
              <strong>Notes:</strong> ${task.notes}
            </div>
          `;
        }
        
        if (task.photos.length > 0) {
          reportContent += `<div class="photos">`;
          task.photos.forEach(photo => {
            reportContent += `<img class="photo" src="${photo.dataUrl}" alt="Inspection photo">`;
          });
          reportContent += `</div>`;
        }
        
        reportContent += `</div>`;
      });
      
      reportContent += `</div>`;
    });
    
    // Add signature area
    reportContent += `
      <div class="signature-area">
        <div>
          <p>Inspection Completed By:</p>
          <div class="signature-line"></div>
          <p>Student Signature</p>
        </div>
        <div style="margin-top: 30px;">
          <div class="signature-line"></div>
          <p>Instructor/Scrutineer Signature</p>
        </div>
      </div>
    `;
    
    reportContent += `
      </body>
      </html>
    `;
    
    // Create blob and download link
    const blob = new Blob([reportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inspection-report-${studentInfo.name ? studentInfo.name.replace(/\s+/g, '-') : 'unnamed'}-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 100);
  };

  // Reset the form
  const resetForm = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setChecklist(defaultChecklist);
      setStudentInfo(defaultStudentInfo);
      localStorage.removeItem('raceInspectionChecklist');
      localStorage.removeItem('raceInspectionStudentInfo');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Post-Race Inspection Checklist</h1>
        <div className="mt-2 bg-blue-600 rounded-full h-6 overflow-hidden">
          <div 
            className="bg-green-400 h-full rounded-full transition-all duration-500 ease-in-out" 
            style={{ width: `${calculateProgress()}%` }}
          ></div>
        </div>
        <p className="text-center text-white mt-1">{calculateProgress()}% Complete</p>
      </header>
      
      {/* Main content */}
      <main className="flex-grow p-4 max-w-4xl mx-auto w-full">
        {/* Student Information */}
        <section className="bg-white rounded-lg shadow-md p-4 mb-6">
          <h2 className="text-lg font-bold mb-4 text-blue-800">Inspection Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                value={studentInfo.name}
                onChange={(e) => updateStudentInfo('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                value={studentInfo.studentId}
                onChange={(e) => updateStudentInfo('studentId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={studentInfo.date}
                onChange={(e) => updateStudentInfo('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle ID/Number</label>
              <input
                type="text"
                value={studentInfo.vehicleId}
                onChange={(e) => updateStudentInfo('vehicleId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter vehicle ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Race Event</label>
              <input
                type="text"
                value={studentInfo.raceEvent}
                onChange={(e) => updateStudentInfo('raceEvent', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter race event name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Car Class</label>
              <input
                type="text"
                value={studentInfo.carClass}
                onChange={(e) => updateStudentInfo('carClass', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter car class"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
              <input
                type="text"
                value={studentInfo.teamName}
                onChange={(e) => updateStudentInfo('teamName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter team name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scrutineer Name</label>
              <input
                type="text"
                value={studentInfo.scrutineerName}
                onChange={(e) => updateStudentInfo('scrutineerName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter scrutineer name"
              />
            </div>
          </div>
        </section>
        
        {/* Camera Modal */}
        {activeCamera && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full">
              <div className="p-4 border-b">
                <h3 className="text-lg font-bold">Take Photo</h3>
              </div>
              <div className="p-4">
                <video 
                  ref={videoRef} 
                  className="w-full h-64 bg-black object-cover mb-4 rounded" 
                  autoPlay 
                  playsInline
                />
                <div className="flex justify-between">
                  <button 
                    onClick={stopCamera} 
                    className="px-4 py-2 bg-gray-500 text-white rounded-md flex items-center"
                  >
                    <X size={18} className="mr-1" /> Cancel
                  </button>
                  <button 
                    onClick={capturePhoto} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
                  >
                    <Camera size={18} className="mr-1" /> Capture
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Checklist Sections */}
        {checklist.map(section => (
          <section key={section.id} className="bg-white rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-lg font-bold mb-4 text-blue-800">{section.title}</h2>
            
            {section.tasks.map(task => (
              <div key={task.id} className="border border-gray-200 rounded-md p-4 mb-4">
                <div className="flex items-start mb-2">
                  <button 
                    onClick={() => toggleTask(section.id, task.id)}
                    className="flex-shrink-0 mt-1"
                  >
                    {task.completed ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <Square size={20} className="text-gray-400" />
                    )}
                  </button>
                  <span className="ml-2 text-gray-800">{task.text}</span>
                </div>
                
                <div className="pl-7">
                  {/* Notes input */}
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={task.notes}
                      onChange={(e) => updateNotes(section.id, task.id, e.target.value)}
                      rows="2"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Add notes here..."
                    />
                  </div>
                  
                  {/* Photos section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {task.photos.map(photo => (
                        <div key={photo.id} className="relative">
                          <img 
                            src={photo.dataUrl} 
                            alt="Inspection photo" 
                            className="w-24 h-24 object-cover rounded border border-gray-300"
                          />
                          <button 
                            onClick={() => removePhoto(section.id, task.id, photo.id)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => startCamera(section.id, task.id)}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md flex items-center"
                      >
                        <Camera size={16} className="mr-1" /> Take Photo
                      </button>
                      <label className="px-3 py-1 text-sm bg-gray-600 text-white rounded-md flex items-center cursor-pointer">
                        <Plus size={16} className="mr-1" /> Add Photo
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileUpload(section.id, task.id, e)}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        ))}
        
        {/* Action buttons */}
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <button 
            onClick={resetForm}
            className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center"
          >
            <X size={18} className="mr-1" /> Reset Form
          </button>
          <button 
            onClick={generateReport}
            className="px-4 py-2 bg-green-600 text-white rounded-md flex items-center"
          >
            <Download size={18} className="mr-1" /> Download Report
          </button>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 text-sm">
        <p>Data is saved locally on your device. Your work will be automatically saved.</p>
      </footer>
    </div>
  );
};

export default RaceInspectionApp;