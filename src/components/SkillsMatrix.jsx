import { motion } from 'framer-motion'

function SkillsMatrix() {
  const skillGroups = [
    {
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'React', 'Flutter'],
      color: 'accent-teal',
    },
    {
      category: 'Backend',
      skills: ['PHP', 'Laravel', 'REST APIs', 'Sanctum Auth', 'Database Design', 'Performance Optimization'],
      color: 'accent-amber',
    },
    {
      category: 'Database',
      skills: ['MySQL', 'Query Optimization', 'Database Design', 'Data Modeling'],
      color: 'accent-teal',
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma', 'Vercel'],
      color: 'accent-amber',
    },
    {
      category: 'AI & Research',
      skills: ['IoT Integration', 'System Design', 'Python Basics', 'Machine Learning Concepts'],
      color: 'accent-teal',
    },
    {
      category: 'Soft Skills',
      skills: ['Problem Solving', 'Team Collaboration', 'Technical Writing', 'Project Management'],
      color: 'accent-amber',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-teal">Skills</span> & Expertise
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={groupIndex}
              className="glass-card p-6"
              variants={itemVariants}
            >
              <h3 className={`text-xl font-bold ${group.color === 'accent-teal' ? 'text-accent-teal' : 'text-accent-amber'} mb-4`}>
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skillIndex}
                    className={`px-3 py-1 bg-${group.color}/10 border border-${group.color}/30 rounded-full text-sm text-gray-300 hover:bg-${group.color}/20 transition-colors`}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech Stack Overview */}
        <motion.div
          className="mt-16 glass-card p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-accent-teal mb-4">Current Tech Stack</h3>
          <p className="text-gray-300 mb-6">
            Building modern applications with React, Laravel, Flutter, and Tailwind CSS
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="font-code text-accent-teal bg-accent-teal/10 px-4 py-2 rounded-lg">
              React 18+
            </span>
            <span className="font-code text-accent-amber bg-accent-amber/10 px-4 py-2 rounded-lg">
              Laravel 10+
            </span>
            <span className="font-code text-accent-teal bg-accent-teal/10 px-4 py-2 rounded-lg">
              Tailwind CSS
            </span>
            <span className="font-code text-accent-amber bg-accent-amber/10 px-4 py-2 rounded-lg">
              Flutter
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default SkillsMatrix
