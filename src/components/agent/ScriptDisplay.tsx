import React, { useMemo } from 'react';
import { Lead, CallScript } from '../../types';

interface ScriptDisplayProps {
  script: CallScript;
  lead: Lead;
}

export default function ScriptDisplay({ script, lead }: ScriptDisplayProps) {
  const parsedScript = useMemo(() => {
    let content = script.content;
    
    // Replace variables with lead data
    script.variables.forEach(variable => {
      const value = lead[variable as keyof Lead] || lead.customFields[variable] || '[Not Available]';
      content = content.replace(new RegExp(`{${variable}}`, 'g'), value);
    });

    return content;
  }, [script, lead]);

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{script.title}</h3>
      <div className="prose max-w-none">
        {parsedScript.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}