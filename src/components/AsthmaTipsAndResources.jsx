import { FaBook, FaInfoCircle } from 'react-icons/fa';

const AsthmaTipsAndResources = () => {
  const tips = [
    { 
      text: "Avoid triggers like smoke, pollen, and pet dander.", 
      image: "src/assets/images/images (1).jpg" 
    },
    { 
      text: "Take medications as prescribed by your healthcare provider.", 
      image: "src/assets/images/3585204_66161 (1).jpg" 
    },
    { 
      text: "Use a peak flow meter to monitor lung function regularly.", 
      image: "src/assets/images/11667706_20945553.jpg" 
    },
    { 
      text: "Develop an action plan with your healthcare provider.", 
      image: "/src/assets/images/7321317_3629599.jpg" 
    },
    { 
      text: "Keep your inhaler accessible at all times.", 
      image: "src/assets/images/138418890_41b1386c-7f44-4d8e-b5b2-068d81ad78ba.jpg" 
    },
  ];

  const resources = [
    { 
      name: "Asthma and Allergy Foundation of America", 
      link: "https://www.aafa.org", 
      icon: <FaBook /> 
    },
    { 
      name: "CDC Asthma", 
      link: "https://www.cdc.gov/asthma", 
      icon: <FaInfoCircle /> 
    },
    { 
      name: "American Lung Association", 
      link: "https://www.lung.org", 
      icon: <FaBook /> 
    },
    
  ];

  return (
    <div className="p-6e  max-w-full mx-auto mt-10 mb-10">
      <h2 className="text-3xl font-bold mb-16 text-cyan-500 text-center ">Asthma Management Tips</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
        {tips.map((tip, index) => (
          <div key={index} className="flex flex-col items-center">
            <img 
              src={tip.image} 
              alt="Asthma tip icon" 
              className="w-60 h-60 object-cover mb-4" 
            />
            <p className="text-center text-gray-400">{tip.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold mt-16 mb-10 text-cyan-500 text-center">Educational Resources</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mb-24">
        {resources.map((resource, index) => (
          <a 
            key={index} 
            href={resource.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex flex-col items-center text-center text-cyan-500 hover:text-cyan-700 transition-colors"
          >
            <div className="w-16 h-16 flex items-center justify-center bg-cyan-100 rounded-full mb-4 text-3xl">
              {resource.icon}
            </div>
            <p className="font-semibold">{resource.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AsthmaTipsAndResources;
