import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaImages,
  FaRobot,
  FaSearch,
  FaShieldAlt
} from "react-icons/fa";

import api from "../api/api";

function Stats() {

  const [stats, setStats] = useState({

    images_uploaded: 0,

    ai_captions: 0,

    semantic_searches: 0,

    duplicates_prevented: 0

  });

  const fetchStats = async () => {

    try {

      const response = await api.get("/dashboard");

      setStats(response.data);

    }

    catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

        fetchStats();

        const interval = setInterval(() => {

            fetchStats();

        }, 2000);

        return () => clearInterval(interval);

    }, []);

  const cards = [

    {

      icon: <FaImages />,

      title: "Images Uploaded",

      value: stats.images_uploaded,

      color: "#2563eb"

    },

    {

      icon: <FaRobot />,

      title: "AI Captions",

      value: stats.ai_captions,

      color: "#7c3aed"

    },

    {

      icon: <FaSearch />,

      title: "Semantic Searches",

      value: stats.semantic_searches,

      color: "#06b6d4"

    },

    {

      icon: <FaShieldAlt />,

      title: "Duplicates Prevented",

      value: stats.duplicates_prevented,

      color: "#22c55e"

    }

  ];

  return (

    <section className="stats-section">

      {

        cards.map((item, index) => (

          <motion.div

            key={index}

            className="stat-card"

            initial={{

              opacity: 0,

              y: 25

            }}

            animate={{

              opacity: 1,

              y: 0

            }}

            transition={{

              delay: index * 0.12

            }}

            whileHover={{

              scale: 1.05

            }}

          >

            <div

              className="stat-icon"

              style={{

                background: item.color

              }}

            >

              {item.icon}

            </div>

            <div className="stat-content">

              <h2>{item.value}</h2>

              <p>{item.title}</p>

            </div>

          </motion.div>

        ))

      }

    </section>

  );

}

export default Stats;