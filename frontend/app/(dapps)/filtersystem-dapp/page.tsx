"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Achievement {
    identifier: string;
    achievementType: string;
    name: string;
    description: string;
    skills: { [key: string]: string };
    hours: number;
    categories: string[];
    yearCreated: string;
    lastUpdated: string;
}

interface SelectedSkill {
    skill: string;
    level: string;
}

const FilterSystem: React.FC = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedSkills, setSelectedSkills] = useState<SelectedSkill[]>([]);
    const [createdAfter, setCreatedAfter] = useState<string | null>(null);
    const [updatedAfter, setUpdatedAfter] = useState<string | null>(null);

    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const response = await fetch('/OCcredits.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data: Achievement[] = await response.json();
                setAchievements(data);
            } catch (error) {
                console.error('Error fetching the JSON data:', error);
            }
        };
        loadAchievements();
    }, []);

    const uniqueTypes = Array.from(new Set(achievements.map(a => a.achievementType)));
    const uniqueCategories = Array.from(new Set(achievements.flatMap(a => a.categories)));
    const uniqueSkills = Array.from(new Set(achievements.flatMap(a => Object.keys(a.skills))));
    const proficiencyLevels = ["All", "Beginner", "Intermediate", "Advanced"];
    const uniqueYears = Array.from(new Set(achievements.flatMap(a => [a.yearCreated, a.lastUpdated]))).sort();

    const addSkillFilter = (skill: string) => {
        if (!selectedSkills.find(s => s.skill === skill)) {
            setSelectedSkills([...selectedSkills, { skill, level: "All" }]);
        }
    };

    const updateSkillLevel = (skill: string, level: string) => {
        setSelectedSkills(selectedSkills.map(s => s.skill === skill ? { ...s, level } : s));
    };

    const removeSkillFilter = (skill: string) => {
        setSelectedSkills(selectedSkills.filter(s => s.skill !== skill));
    };

    const filteredAchievements = achievements.filter(achievement => {
        const matchesType = selectedType ? achievement.achievementType === selectedType : true;
        const matchesCategory = selectedCategory ? achievement.categories.includes(selectedCategory) : true;
        const matchesSkills = selectedSkills.every(({ skill, level }) =>
            level === "All" ? skill in achievement.skills : achievement.skills[skill] === level
        );
        const matchesCreatedAfter = createdAfter ? parseInt(achievement.yearCreated) >= parseInt(createdAfter) : true;
        const matchesUpdatedAfter = updatedAfter ? parseInt(achievement.lastUpdated) >= parseInt(updatedAfter) : true;
        return matchesType && matchesCategory && matchesSkills && matchesCreatedAfter && matchesUpdatedAfter;
    });

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
            <Card className="w-full max-w-3xl p-6 mb-6">
                <CardHeader>
                    <CardTitle>Filter Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h3>Filter by Achievement Type</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Button onClick={() => setSelectedType(null)}>All Types</Button>
                            {uniqueTypes.map(type => (
                                <Button
                                    key={type}
                                    onClick={() => setSelectedType(type)}
                                    className={`${selectedType === type ? 'bg-blue-500' : ''}`}
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3>Filter by Category</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Button onClick={() => setSelectedCategory(null)}>All Categories</Button>
                            {uniqueCategories.map(category => (
                                <Button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`${selectedCategory === category ? 'bg-blue-500' : ''}`}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h3>Filter by Skills and Levels</h3>
                        <div className="flex gap-2 flex-wrap">
                            <Button onClick={() => setSelectedSkills([])}>All Skills</Button>
                            {uniqueSkills.map(skill => (
                                <Button
                                    key={skill}
                                    onClick={() => addSkillFilter(skill)}
                                    className={`${selectedSkills.find(s => s.skill === skill) ? 'bg-blue-500' : ''}`}
                                >
                                    {skill}
                                </Button>
                            ))}
                        </div>
                        {selectedSkills.map(({ skill, level }) => (
                            <div key={skill} className="flex items-center gap-2 mt-2">
                                <span>{skill}</span>
                                <select
                                    value={level}
                                    onChange={(e) => updateSkillLevel(skill, e.target.value)}
                                    className="border rounded px-2 py-1"
                                >
                                    {proficiencyLevels.map(profLevel => (
                                        <option key={profLevel} value={profLevel}>{profLevel}</option>
                                    ))}
                                </select>
                                <Button onClick={() => removeSkillFilter(skill)} className="bg-red-500">
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h3>Filter by Year Created</h3>
                        <select onChange={(e) => setCreatedAfter(e.target.value)} value={createdAfter || ""} className="border rounded px-2 py-1">
                            <option value="">All Years</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <h3>Filter by Year Updated</h3>
                        <select onChange={(e) => setUpdatedAfter(e.target.value)} value={updatedAfter || ""} className="border rounded px-2 py-1">
                            <option value="">All Years</option>
                            {uniqueYears.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </CardContent>
            </Card>

            <div className="w-full max-w-3xl">
                {filteredAchievements.map((achievement) => (
                    <Card key={achievement.identifier} className="mb-4 p-6">
                        <CardTitle>{achievement.name}</CardTitle>
                        <CardContent className="space-y-2">
                            <p><strong>Type:</strong> {achievement.achievementType}</p>
                            <p><strong>Description:</strong> {achievement.description}</p>
                            <p><strong>Hours:</strong> {achievement.hours}</p>
                            <p><strong>Year Created:</strong> {achievement.yearCreated}</p>
                            <p><strong>Last Updated:</strong> {achievement.lastUpdated}</p>
                            <p><strong>Categories:</strong> {achievement.categories.join(", ")}</p>
                            <div>
                                <strong>Skills:</strong>
                                <ul>
                                    {Object.entries(achievement.skills).map(([skill, skillLevel]) => (
                                        <li key={skill}>{skill}: {skillLevel}</li>
                                    ))}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default FilterSystem;
